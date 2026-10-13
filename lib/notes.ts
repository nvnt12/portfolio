// Short write-ups. Each note is a list of blocks, so there's no Markdown pipeline to maintain.

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "code"; lang: string; code: string };

export type Note = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  project?: string; // slug of the project it comes from
  body: Block[];
};

export const notes: Note[] = [
  {
    slug: "double-bookings-postgres-constraint",
    title: "Making double bookings impossible with one Postgres constraint",
    date: "2026-10-13",
    summary:
      "Why the “is this slot free?” check belongs in the database, and the tsrange gotcha I hit on the way.",
    project: "coworkhq",
    body: [
      {
        type: "p",
        text: "Every booking app has the same race. Two people look at the same free slot, both press Book, and both requests check availability before either one writes. A check-then-insert in application code can’t win that race, because the check is stale by the time the insert lands.",
      },
      {
        type: "p",
        text: "In CoWorkHQ I moved the rule into the database, which is the one place that actually sees every write.",
      },
      { type: "h", text: "The constraint" },
      {
        type: "code",
        lang: "sql",
        code: `CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "bookings"
  ADD COLUMN "during" tsrange
    GENERATED ALWAYS AS (tsrange("startsAt", "endsAt", '[)')) STORED;

ALTER TABLE "bookings"
  ADD CONSTRAINT "no_overlapping_bookings"
  EXCLUDE USING gist ("resourceId" WITH =, "during" WITH &&)
  WHERE ("status" <> 'cancelled');`,
      },
      {
        type: "p",
        text: "“during” is a generated column holding each booking’s time range, half-open so a booking ending at 10:00 doesn’t clash with one starting at 10:00. The EXCLUDE constraint says no two rows may have the same space and overlapping ranges. btree_gist is what lets a plain equality check on the space sit in the same GiST index as the range overlap.",
      },
      {
        type: "p",
        text: "The WHERE clause matters. Cancelled bookings don’t block anything, but a booking held while someone pays does, so a slot can’t be sold twice during checkout. Expired holds are released just before each insert.",
      },
      { type: "h", text: "The gotcha: tsrange, not tstzrange" },
      {
        type: "p",
        text: "My first version used tstzrange and Postgres refused with “generation expression is not immutable”. Prisma stores DateTime as timestamp without a time zone, and casting that to timestamptz depends on the session’s TimeZone setting, so it isn’t immutable. Prisma writes everything in UTC, so comparing as tsrange is correct, and the migration says so in case the columns ever change.",
      },
      { type: "h", text: "Turning the error into a product message" },
      {
        type: "p",
        text: "The UI shows which slots are free, but that’s a hint, not the guarantee. When an insert hits the constraint, the API recognises the exclusion violation (SQLSTATE 23P01) and returns “that slot was just taken” instead of a 500. The same constraint guards rescheduling for free: a row never conflicts with itself, so moving a booking only fails on a genuine clash.",
      },
      {
        type: "p",
        text: "Prisma’s schema language can’t express an EXCLUDE constraint, so it lives in a hand-written migration. Of everything in the project, it’s the migration I’d least want to lose.",
      },
    ],
  },
  {
    slug: "settling-a-payment-that-arrives-three-times",
    title: "Settling a payment that can arrive three times",
    date: "2026-10-13",
    summary:
      "A redirect, a webhook and a server-side check can all report the same payment. Here’s how each one gets settled exactly once.",
    project: "coworkhq",
    body: [
      {
        type: "p",
        text: "When someone pays for a CoWorkHQ booking on Razorpay’s hosted page, the server can hear about it three ways: the browser redirect back to the app, Razorpay’s webhook, and a server-side check for when neither of those gets through (an API on localhost, for one). They arrive in any order, sometimes at the same moment.",
      },
      {
        type: "p",
        text: "If each of them confirmed the booking, the best case is double confirmations and the worst is keeping money for a slot someone else took. So every path calls one function, and that function is idempotent.",
      },
      { type: "h", text: "Claim first, decide second" },
      {
        type: "code",
        lang: "ts",
        code: `const claimed = await prisma.payment.updateMany({
  where: { id: paymentId, status: "created" },
  data: { status: "refunding", razorpayPaymentId, paidAt: new Date() },
});

if (claimed.count === 0) {
  // Another report got here first: read back what it decided.
}`,
      },
      {
        type: "p",
        text: "The conditional update is the lock. Postgres guarantees only one caller moves the payment out of “created”; everyone else gets a count of zero and reads the outcome instead of acting on it.",
      },
      {
        type: "p",
        text: "The claimed state is named “refunding” on purpose. Until the booking is confirmed, the safe default is to give the money back. If the process dies halfway, the next report (a webhook redelivery, say) sees “refunding” and finishes the refund. Failing towards a refund beats failing towards keeping money for nothing.",
      },
      { type: "h", text: "When the money can’t be kept" },
      {
        type: "p",
        text: "A captured payment only stays if it confirmed its booking. It’s refunded in full if the person cancelled while paying, if the 15-minute hold lapsed and someone else booked the slot (the exclusion constraint from my other note catches that), if an earlier payment already confirmed the booking (two tabs, or a retry racing the first), or if the booking’s time has already passed. The amount is always worked out on the server from the space’s price, never taken from the client.",
      },
      { type: "h", text: "The takeaway" },
      {
        type: "p",
        text: "Whenever an outside system can tell you the same thing more than once, design for at-least-once delivery: one entry point, a conditional write as the claim, and a safe default for the half-finished state.",
      },
    ],
  },
];

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

import { pgTable, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', {
  sessionId: text('session_id').primaryKey(),
  courseId: integer('course_id').notNull(),
  courseName: text('course_name').notNull(),
  customerEmail: text('customer_email'),
  amountPaid: integer('amount_paid').notNull(),
  currency: text('currency').notNull(),
  testMode: boolean('test_mode').notNull(),
  paidAt: timestamp('paid_at', { withTimezone: true }).defaultNow().notNull(),
})

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "razorpayId" TEXT,
    "reading" DECIMAL(10,2),
    "unitsConsumed" DECIMAL(10,2),
    "txSignature" TEXT,
    "billImageUrl" TEXT,
    "roomNumber" TEXT,
    "totalAmount" DECIMAL(10,2),
    "failureReason" TEXT,
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "razorpayCreatedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_razorpayId_key" ON "public"."Order"("razorpayId");

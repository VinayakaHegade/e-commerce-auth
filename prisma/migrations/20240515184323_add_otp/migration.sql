-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failedOtpAttempts" INTEGER DEFAULT 0,
ADD COLUMN     "otpLockoutExpiry" TIMESTAMP(3),
ADD COLUMN     "verificationCode" TEXT,
ADD COLUMN     "verificationExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "User_verificationCode_verificationExpiry_idx" ON "User"("verificationCode", "verificationExpiry");

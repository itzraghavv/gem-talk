-- CreateTable
CREATE TABLE "PdfData" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "parsedData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfData" ADD CONSTRAINT "PdfData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

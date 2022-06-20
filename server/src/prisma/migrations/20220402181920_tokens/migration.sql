-- CreateTable
CREATE TABLE "Token" (
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("userId","refreshToken")
);

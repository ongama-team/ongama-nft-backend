"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNftsTable1651143902595 = void 0;
class createNftsTable1651143902595 {
    async up(queryRunner) {
        await queryRunner.query(`
                    -- Table Definition
                    CREATE TABLE "nfts" (
                        "id" BIGSERIAL PRIMARY KEY,
                        "userId" int8,
                        "tokenUri" varchar NOT NULL,
                        "tokenID" int8 UNIQUE,
                        "ownerAddress" varchar NOT NULL,
                        "ownerId" int8,
                        "creatorAddress" varchar NOT NULL,
                        "creatorId" int8,
                        "ownerUsername" varchar,
                        "name" varchar NOT NULL,
                        "description" varchar NOT NULL,
                        "fileSize" float4 DEFAULT 0.0,
                        "fileType" varchar,
                        "listed" bool DEFAULT false,
                        "listedOnchain" bool DEFAULT false,
                        "verified" bool DEFAULT false,
                        "isVideo" bool DEFAULT false,
                        "image" varchar,
                        "url" varchar,
                        "urlCompressed" varchar,
                        "urlThumbnail" varchar,
                        "mintTransactionHash" varchar,
                        "price" float8,
                        "storageFee" float8,
                        "storageFeeTransaction" varchar,
                        "active" bool DEFAULT true,
                        "priority" int4,
                        "createdAt" timestamptz NOT NULL DEFAULT now(),
                        "updatedAt" timestamptz NOT NULL DEFAULT now()
                    );
                `, undefined);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "nfts";', undefined);
    }
}
exports.createNftsTable1651143902595 = createNftsTable1651143902595;
//# sourceMappingURL=1651143902595-create_nfts_table.js.map
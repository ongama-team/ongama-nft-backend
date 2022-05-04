"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersTable1651143888123 = void 0;
class createUsersTable1651143888123 {
    async up(queryRunner) {
        await queryRunner.query(`
                  -- Table Definition
                  CREATE TABLE "users" (
                    "id" BIGSERIAL PRIMARY KEY,
                    "walletAddress" varchar NOT NULL UNIQUE,
                    "username" varchar,
                    "usernameLowercase" varchar,
                    "avatarUrl" varchar,
                    "avatarUrlThumbnail" varchar,
                    "avatarUrlCompressed" varchar,
                    "coverUrl" varchar,
                    "coverThumbnailUrl" varchar,
                    "userBio" varchar,
                    "nftsCount" int4 DEFAULT 0,
                    "buysCount" int4 DEFAULT 0,
                    "salesCount" int4 DEFAULT 0,
                    "buysTotalAmount" float8 DEFAULT 0,
                    "banned" bool DEFAULT false,
                    "active" bool DEFAULT true,
                    "verified" bool DEFAULT false,
                    "notAllowedToMint" bool DEFAULT false,
                    "createdAt" timestamptz NOT NULL DEFAULT now(),
                    "updatedAt" timestamptz NOT NULL DEFAULT now()
                  );
                `, undefined);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "users";', undefined);
    }
}
exports.createUsersTable1651143888123 = createUsersTable1651143888123;
//# sourceMappingURL=1651143888123-create_users_table.js.map
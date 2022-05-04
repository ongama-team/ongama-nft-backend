import 'dotenv/config';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersRepository } from '../modules/users/users.repository';
export declare class WalletSignatureGuard implements CanActivate {
    private reflector;
    private userRepo;
    constructor(reflector: Reflector, userRepo: UsersRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

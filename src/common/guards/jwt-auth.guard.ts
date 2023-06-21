import { AuthGuard } from '@nestjs/passport';

/**
 * This is the same as the JwtStrategy class
 * and it is used almost every controller. so that is why I located it here.
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}

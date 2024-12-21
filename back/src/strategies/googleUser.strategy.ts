import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthUsersService } from "src/auth/auth-user/auth-users.service";
import googleOauthConfig from "src/config/googleOauth.config";
import { reverseAndMixEmail } from 'src/utils/generateGooglePassword.util';
@Injectable()
export class GoogleStrategyForUsers extends PassportStrategy(Strategy, 'google-users') {
    constructor(@Inject(googleOauthConfig.KEY) 
                private googleConfiguration: ConfigType<typeof googleOauthConfig>,
                private authUsersService: AuthUsersService){
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackForUsers,
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done:VerifyCallback) {
        const user = await this.authUsersService.validateGoogleUser({
            email: profile.emails[0].value,
            name: profile.displayName,
            googlePassword: reverseAndMixEmail(profile.emails[0].value),
          });
        done(null, user); 
    }
} 
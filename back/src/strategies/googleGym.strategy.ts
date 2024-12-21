import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthGymsService } from "src/auth/auth-gyms/auth-gyms.service";
import googleOauthConfig from "src/config/googleOauth.config";
import { reverseAndMixEmail } from 'src/utils/generateGooglePassword.util';
@Injectable()
export class GoogleStrategyForGyms extends PassportStrategy(Strategy, 'google-gyms') {
    constructor(@Inject(googleOauthConfig.KEY) 
                private googleConfiguration: ConfigType<typeof googleOauthConfig>,
                private authGymsService: AuthGymsService){
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackForGyms,
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done:VerifyCallback) {
        const gym = await this.authGymsService.validateGoogleGym({
            email: profile.emails[0].value,
            name: profile.displayName,
            googlePassword: reverseAndMixEmail(profile.emails[0].value),
          });
        done(null, gym); 
    }
} 
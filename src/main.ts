import { bootstrapApplication } from '@angular/platform-browser';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

injectSpeedInsights();
inject();

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

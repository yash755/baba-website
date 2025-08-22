import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

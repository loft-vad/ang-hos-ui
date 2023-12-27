import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainPageComponent } from './main-page/main-page.component';
import { ItemComponent } from './item/item.component';
import { IconComponent } from './icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LongTextDirective } from './directives/long-text.directive';

@NgModule({
	declarations: [
		MainPageComponent,
		ItemComponent,
		IconComponent,
		TruncatePipe,
		LongTextDirective,
	],
	imports: [BrowserModule, ReactiveFormsModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [MainPageComponent],
})
export class AppModule {}

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appLongText]',
})
export class LongTextDirective {
	@Input()
	appLongText!: string;

	private isTruncated = false;
	private isTextLong = false;
	private maxStrLength = 200;
	private maxWordsLength = 60;

	private resizeTimeout: any;

	constructor(private el: ElementRef) {}

	private truncateText() {
		this.el.nativeElement.innerText =
			this.appLongText
				.split(' ')
				.splice(0, this.maxWordsLength)
				.join(' ') + '...';
		this.isTruncated = !this.isTruncated;
	}

	private extendText() {
		this.el.nativeElement.innerText = this.appLongText;
		this.isTruncated = !this.isTruncated;
	}

	ngAfterViewInit() {
		this.isTextLong =
			this.appLongText.length > this.maxStrLength ? true : false;
		this.truncateText();
	}

	@HostListener('click')
	onClick() {
		if (this.isTextLong) {
			this.isTruncated ? this.extendText() : this.truncateText();
		}
	}

	@HostListener('window:resize')
	resize() {
		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
		}
		this.resizeTimeout = setTimeout(
			(() => {
				console.log('Resize complete');
			}).bind(this),
			500
		);
	}
}

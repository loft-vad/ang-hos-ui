import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { Icons } from '../consts/icons.enum';
import { Item } from '../models/item.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Statuses } from '../consts/statuses.enum';
import {
	animate,
	query,
	style,
	transition,
	trigger,
} from '@angular/animations';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('itemAnimation', [
			transition(':enter', [
				query('*', [
					style({ opacity: 0, height: 0 }),
					animate('300ms', style({ opacity: 1, height: '*' })),
				]),
			]),
			transition(':leave', [
				query('*', [
					style({ opacity: 1 }),
					animate('150ms', style({ opacity: 0, height: 0 })),
				]),
			]),
		]),
	],
})
export class ItemComponent implements OnDestroy, OnInit {
	@Output()
	public killMe = new EventEmitter<void>();

	@Output()
	private isChecked = new EventEmitter<boolean>();

	@Input()
	public item!: Item;

	public Icons = Icons;

	public checkbox = new FormControl();

	private checkSubscription!: Subscription;

	constructor(private host: ElementRef<HTMLElement>) {}

	@HostBinding('@itemAnimation') true: any;

	@HostListener(':mouseover', ['$event'])
	mouseover(event: any) {
		if (event.target.matches('section > :not(div) > div')) {
			this.host.nativeElement.style.setProperty(
				'--filter',
				'invert(0.7)'
			);
		}
	}

	@HostListener(':mouseout', ['$event'])
	mouseout(event: any) {
		if (event.target.matches('div')) {
			this.host.nativeElement.style.setProperty('--filter', 'invert(0)');
		}
	}

	ngOnInit(): void {
		this.checkSubscription = this.checkbox.valueChanges.subscribe(
			(isChecked: boolean) => {
				this.isChecked.emit(isChecked);
			}
		);
	}

	ngAfterViewInit() {
		if (this.item.status == Statuses.inactive) {
			this.host.nativeElement.classList.toggle('inactive');
		}
	}

	ngOnDestroy(): void {
		this.checkSubscription.unsubscribe();
	}
}

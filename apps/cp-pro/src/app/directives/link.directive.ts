import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: 'a[cpLink]',
  standalone: true,
})
export class LinkDirective {
  @Input() @HostBinding('attr.href') public href = '#';

  public constructor(private router: Router) {
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.preventDefault();
    void this.router.navigateByUrl(this.href);
  }
}

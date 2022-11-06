import { ComponentRef, Directive, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ContentComponent } from '../components';
import { LocationNodeModel } from '../models';
import { ComponentResolverService } from '../services/component-resolver.service';

@Directive({
  selector: 'ng-template[cpDynamicContent]',
  standalone: true,
})
export class DynamicContentDirective implements OnChanges {
  @Input() location!: LocationNodeModel;

  public constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly componentResolver: ComponentResolverService,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  private update(): void {
    this.viewContainer.clear();

    const componentRef: ComponentRef<ContentComponent> = this.viewContainer.createComponent(
      this.componentResolver.getConstructor(this.location),
    );
  }
}

import { EventEmitter, OnDestroy, Type, ɵdetectChanges as detectChanges, ɵrenderComponent as renderComponent } from '@angular/core';
import { Component, ComponentType, createElement, createRef } from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function createReactComponent<P, T extends Partial<OnDestroy> = any>(selector: string, component: Type<T>): ComponentType<P> {
    return class extends Component<P> {

        /** Reference the component element */
        private elementRef = createRef<HTMLDivElement>();

        /** Store a reference to the component instance */
        private componentRef: T;

        /** Unsubscribe from all event emitters on component destroy */
        private unsubscribe$ = new Subject<void>();

        componentDidMount(): void {
            this.componentRef = renderComponent(component, { host: this.elementRef.current });
            this.forwardProps();
            this.forwardEvents();
            detectChanges(this.componentRef);
        }

        componentDidUpdate(prevProps: Readonly<P>): void {
            if (this.props !== prevProps) {
                this.forwardProps();
                detectChanges(this.componentRef);
            }
        }

        componentWillUnmount(): void {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();

            if (typeof this.componentRef.ngOnDestroy === 'function') {
                this.componentRef.ngOnDestroy();
            }
        }

        /** Render the hose element that we can mount the component into */
        render(): JSX.Element {
            return createElement(selector, { ref: this.elementRef });
        }

        /** We want to forward all input values to the component */
        private forwardProps(): void {
            for (const prop in this.props) {
                // pass in only the inputs, exclude ouputs
                if (!(this.componentRef[prop] instanceof EventEmitter)) {
                    this.componentRef[prop] = this.props[prop];
                }
            }
        }

        /** Subscribe to event emitters and forward values to functions */
        private forwardEvents(): void {
            for (const prop in this.componentRef) {

                // access the property on the component and props
                const componentProperty = this.componentRef[prop];
                const propsProperty = (this.props as any)[prop];

                // pass in only the inputs, exclude ouputs
                if (componentProperty instanceof EventEmitter && typeof propsProperty === 'function') {
                    componentProperty.pipe(takeUntil(this.unsubscribe$)).subscribe(value => propsProperty(value));
                }
            }
        }
    };
}
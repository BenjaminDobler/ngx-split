import {
  fromEvent,
  last,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

const mouseMove$ = fromEvent<PointerEvent>(document, 'pointermove');
const mouseUp$ = fromEvent<PointerEvent>(document, 'pointerup');

export function makeDraggable(element: HTMLElement) {
  const mouseDown$ = fromEvent<PointerEvent>(element, 'pointerdown').pipe(
    tap((e) => {
      e.preventDefault();
    })
  );

  const dragStart$ = mouseDown$;
  const dragMove$ = dragStart$.pipe(
    switchMap((start) =>
      mouseMove$.pipe(
        map((moveEvent) => ({
          originalEvent: moveEvent,
          deltaX: moveEvent.pageX - start.pageX,
          deltaY: moveEvent.pageY - start.pageY,
          startOffsetX: start.offsetX,
          startOffsetY: start.offsetY,
        })),
        takeUntil(mouseUp$)
      )
    )
  );

  const dragEnd$ = dragStart$.pipe(
    switchMap((start) =>
      mouseMove$.pipe(
        startWith(start),
        map((moveEvent) => ({
          originalEvent: moveEvent,
          deltaX: moveEvent.pageX - start.pageX,
          deltaY: moveEvent.pageY - start.pageY,
          startOffsetX: start.offsetX,
          startOffsetY: start.offsetY,
        })),
        takeUntil(mouseUp$),
        last()
      )
    )
  );

  return { dragStart$, dragMove$, dragEnd$ };
}

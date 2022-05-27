import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import produce from 'immer';

const assign = produce((draft, part) => {
  Object.assign(draft || {}, part);
});

class State<T> {
  get state() {
    return this.getState();
  }

  readonly state$ = new BehaviorSubject<T>({} as T);

  constructor(state?: T) {
    if (state) {
      this.setState(state);
    }
  }

  public select<V>(selectFn: (state: T) => V): Observable<V> {
    return this.state$.pipe(map(selectFn), distinctUntilChanged());
  }

  setState(state: Partial<T> | ((state: T) => void)): void {
    const original = this.getState();

    if (original === state) {
      return;
    }

    const newState =
      typeof state === 'function' ? produce(original, state) : assign(original, state);

    this.state$.next(newState);
  }

  private getState(): T {
    return this.state$.value;
  }
}

export { State };
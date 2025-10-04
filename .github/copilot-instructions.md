You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

This is a food delivery web application built with Angular 20, NgRx, PrimeNG, and Tailwind CSS.

## Project Architecture

### Core Structure
- **Models**: All TypeScript interfaces in `src/models/` with barrel exports via `index.ts`
- **State Management**: NgRx store with feature-based organization (`auth`, `user`, `restaurant`, `cart`, `orders`, `dish`)
- **Services**: Domain-specific services in `src/app/core/services/` using functional injection
- **UI Components**: Reusable components in `src/app/ui/` (nav, forms, tables, etc.)
- **Feature Modules**: Lazy-loaded feature areas (`admin`, `user`, `restaurant`)

### State Management with NgRx
- All state is managed through NgRx store configured in `app.config.ts`
- Use `store.selectSignal()` for reactive state access: `this.store.selectSignal(selectAllRestaurants)`
- Action creators follow `createActionGroup` pattern: `AuthActions.login()`, `restaurantAction.loadRestaurants()`
- Effects handle async operations and API calls
- Selectors use entity adapters where applicable

### API Integration
- Base API URL: `http://localhost:3000`
- Services use functional injection: `private http = inject(HttpClient)`
- Auth interceptor automatically adds Bearer tokens from localStorage
- All API calls return strongly-typed observables

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Import models from barrel export: `import { User, Restaurant } from '../../../models'`

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Use functional injection: `private store = inject(Store)`, `private router = inject(Router)`

## State Management

- Use signals for local component state: `openCartDrawer = signal(false)`
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Access NgRx state via signals: `restaurants = this.store.selectSignal(selectAllRestaurants)`

## Forms & Validation

- Use Reactive Forms with FormBuilder injection: `private fb = inject(FormBuilder)`
- Create validation helper methods: `isInvalid(controlName: string)`, `getErrorMessage(controlName: string)`
- Use effects for form state reactions: `readonly loginStateEffect = effect(() => {...})`
- Reset forms and clear errors after successful operations

## UI Framework Integration

### PrimeNG Components
- Import specific modules: `TableModule`, `ButtonModule`, `InputTextModule`
- Use PrimeNG icons: `icon="pi pi-eye"`, `icon="pi pi-pencil"`
- Apply tooltips: `pTooltip="View Details" tooltipPosition="top"`

### Styling with Tailwind + PrimeUI
- Dark theme with neutral/amber color scheme
- Custom PrimeNG overrides in `styles.css`
- Responsive utilities: `class="w-8 h-8 rounded-lg"`
- Background patterns: `bg-neutral-800/50 backdrop-blur-sm`

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- Follow REST patterns with strongly-typed return types

## Development Workflow

- Start dev server: `npm start` (runs `ng serve`)
- Run tests: `npm test`
- Build: `npm build`
- Code formatting: Prettier configured for Angular templates

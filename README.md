# Scenery UI Components

A modern React UI component library built with TailwindCSS and Radix UI.

## Features

- Built with TypeScript for type safety
- Styled with TailwindCSS for easy customization
- Accessible components powered by Radix UI
- Storybook documentation and interactive examples
- Tree-shakeable ES modules

## Installation

```bash
npm install @scenery-ui/components
```

## Usage

```tsx
import { Button, Dialog } from '@scenery-ui/components';

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hello</DialogTitle>
            <DialogDescription>This is a dialog</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## Components

- **Button** - Flexible button component with multiple variants
- **Dialog** - Modal dialog component built with Radix UI

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build the library
npm run build

# Build Storybook
npm run build-storybook
```

## License

MIT

# FlexPrice Storybook & Testing Enhancements

This repository includes Storybook stories and test improvements for multiple reusable UI components across the design system.

---

# Components Covered

## Atoms

The following atom components now include dedicated Storybook stories with interactive controls and usage examples:

- Button
- Input
- Progress
- FlexPriceSelect
- Spinner
- Tooltip

---

## Molecules

Storybook coverage added/improved for:

- CostDataTable
- MetricCard
- QueryBuilder
  - SortDropdown

---

## Organisms

Storybook coverage added/improved for:

- EmptyState
- SidebarNav
- PlanPriceTable
- CouponModal

### CouponModal Stories

- Default state
- Preselected coupon state
- Empty coupon list state
- Interactive modal workflow
- Interactive empty state

---

# Storybook Improvements

The following improvements were added across stories:

- Interactive controls using `args` and `argTypes`
- Auto-generated documentation with `autodocs`
- Realistic mock data
- Empty state handling
- Pre-selected/default states
- Dashboard-style examples
- Interactive modal behavior
- Improved accessibility and readability
- Better organization using Atomic Design structure

---

# Testing Improvements

Additional tests were added/improved for the following:

## EmptyState

Test coverage includes:

- Rendering validation
- Empty state UI behavior
- Content visibility
- Action/button rendering
- Snapshot testing

## `format_numbers.ts`

Test coverage includes:

- Number formatting validation
- Decimal precision handling
- Currency formatting
- Edge cases
- Zero/null value handling
- Large number formatting

---

# Tech Stack

- React
- TypeScript
- Storybook
- Jest
- React Testing Library
- Tailwind CSS
- Radix UI

---

# Running the Project

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Run Storybook

```bash
npm run storybook
```

## Run Tests

```bash
npm run test
```

---

# Focus Areas

This work focused on:

- Component documentation
- Reusable UI testing
- Better developer experience
- Improved visual consistency
- Edge case handling
- Interactive component workflows
- Scalable Storybook structure

---

# Notes

- Stories are organized using Atomic Design principles.
- Components include realistic usage examples for easier integration.
- Interactive stories simulate production-like behavior for better testing and review.

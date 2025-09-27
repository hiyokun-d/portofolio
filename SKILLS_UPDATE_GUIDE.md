# 🎯 Skills Update Guide

## Single Source of Truth

All skill information is now centralized in one file: `src/data/skillsData.js`

To update any skill, **only edit this file** - all components will automatically use the updated information.

## How to Update Skills

### 1. Add a New Skill

Add a new entry to the `skillsData` object:

```javascript
"newskill": {
    title: "New Technology",
    progress: 75,
    description: "Brief description of the technology",
    proficiency: "Intermediate"
}
```

### 2. Update Existing Skill

Modify any property in the existing skill entry:

```javascript
"react": {
    title: "React",
    progress: 90,  // Updated from 85
    description: "Component-based UI library with hooks",  // Updated description
    proficiency: "Advanced"
}
```

### 3. Remove a Skill

Simply delete the entire skill object from `skillsData`.

## Skill Properties

Each skill should have these properties:

- **`title`**: Display name (e.g., "React", "Next.js")
- **`progress`**: Number 0-100 representing competency level
- **`description`**: Brief description shown in tooltip
- **`proficiency`**: Text level with color coding:
  - `"Advanced"` - Green
  - `"Intermediate"` - Yellow  
  - `"Beginner+"` - Orange
  - `"Beginner"` - Red

## What Gets Updated Automatically

When you update `skillsData.js`, these components automatically reflect the changes:

1. **SkillsCollection**: Uses the `baseSkills` array generated from `skillsData`
2. **SkillsBox**: Gets skill information from `skillsData` for tooltips
3. **SkillTooltip**: Displays the description and proficiency from `skillsData`

## Example Update

To add TypeScript with 80% progress:

```javascript
// In src/data/skillsData.js
"typescript": {
    title: "TypeScript",
    progress: 80,
    description: "Typed superset of JavaScript for better development experience",
    proficiency: "Advanced"
}
```

That's it! No need to update any other files. 🚀
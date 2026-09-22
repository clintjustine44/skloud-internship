import vine from '@vinejs/vine'

// Validation rules when creating a task.
export const createTaskValidator = vine.create({
  //  Everything is required for creating a task
  title: vine.string(),
  description: vine.string(),
  status: vine.enum(['pending', 'in_progress', 'completed']),
})

// Validation rules when updating a task.
export const updateTaskValidator = vine.create({
  // All are optional so you can update specific fields.
  title: vine.string().optional(),
  description: vine.string().optional(),
  status: vine.enum(['pending', 'in_progress', 'completed']).optional(),
})

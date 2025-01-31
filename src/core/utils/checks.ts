/*
 * File: checks.ts
 *
 * Copyright (c) 2022-2022 pikokr
 *
 * Licensed under MIT License. Please see more defails in LICENSE file.
 */

import { BaseInteraction, Interaction, Message } from 'discord.js'
import { createComponentHook } from '../hooks'
import { ComponentHookFn } from '../hooks/componentHook'
import { CommandClient } from '../structures'
import { OwnerOnlyError } from './errors'

export const createCheckDecorator = (fn: ComponentHookFn) => createComponentHook('beforeCall', fn)

export const ownerOnly = createCheckDecorator(async (client: CommandClient, i: Interaction | Message) => {
  let isOwner = false

  if (i instanceof BaseInteraction) {
    client
    isOwner = await client.isOwner(i.user)
  } else if (i instanceof Message) {
    isOwner = await client.isOwner(i.author)
  }

  if (!isOwner) throw new OwnerOnlyError()
})

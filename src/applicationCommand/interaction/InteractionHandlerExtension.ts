/*
 * File: InteractionHandlerExtension.ts
 *
 * Copyright (c) 2022-2022 Dayo
 *
 * Licensed under MIT License. Please see more defails in LICENSE file.
 */

import { CTSExtension } from '../../core/extensions/CTSExtension'
import { listener } from '../../core'
import { Events, Interaction } from 'discord.js'
import { InteractionComponent } from './Interaction'

export class InteractionHandlerExtension extends CTSExtension {
  @listener({
    event: Events.InteractionCreate,
  })
  async interaction(ix: Interaction) {
    if (ix.isButton()) {
      for (const itx of this.commandClient.registry.extensions) {
        const interactions = this.commandClient.registry.getComponentsWithType<InteractionComponent>(itx, InteractionComponent)
        for (const i of interactions) if (i.option.receiveType == 'Button' && i.option.customId == ix.customId) i.method(ix)
      }
    } else if (ix.isStringSelectMenu()) {
      for (const itx of this.commandClient.registry.extensions) {
        const interactions = this.commandClient.registry.getComponentsWithType<InteractionComponent>(itx, InteractionComponent)
        for (const i of interactions) if (i.option.receiveType == 'SelectMenu' && i.option.customId == ix.customId) i.method(ix)
      }
    }
  }
}

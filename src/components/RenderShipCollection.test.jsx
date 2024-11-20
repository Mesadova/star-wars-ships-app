import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import { RenderShipCollection } from './RenderShipCollection';

vi.mock('axios')

describe('Test dispatch fetch()', () => {
    afterEach(async () => {
        vi.restoreAllMocks()
    })

    it('Should bla bla bla', async() => {
        vi.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch'))
        await expect(RenderShipCollection()).rejects.toThrow('Failed to fetch')
    })

    
})
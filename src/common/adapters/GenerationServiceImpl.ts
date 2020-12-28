import { GenerationService } from '../app/GenerationService'
import { v4 as uuidv4 } from 'uuid'

export class GenerationServiceImpl implements GenerationService {
  id(): string {
    return uuidv4()
  }
}

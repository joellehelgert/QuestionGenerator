import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import { Store } from '@ngxs/store';

export interface Museum extends Entity {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MuseumService {
  private crudService: FirestoreCrudService<Museum>;

  constructor(private firestore: AngularFirestore,  private store: Store) {
    this.crudService = new FirestoreCrudService<Museum>(firestore, 'museums', store);
  }

  getAllMuseums() {
    return this.crudService.list();
  }

  getMuseum(museum: Museum) {
    return this.crudService.get(museum.path);
  }

  addMuseum(museum: Museum, path?: string) {
    return this.crudService.add(museum, path);
  }

  removeMuseum(museum: Museum) {
    return this.crudService.delete(museum.path);
  }

  updateMuseum(original: Museum, updatedMuseum: Partial<Museum>) {
    return this.crudService.update({ ...original, updatedMuseum } as Museum); // TODO Typing?
  }
}

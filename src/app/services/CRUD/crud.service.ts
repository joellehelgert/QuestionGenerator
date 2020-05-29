import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AddError, AddSuccess } from 'src/app/states/HintState';

// We need a base Entity interface that our models will extend
export interface Entity {
  path?: string;
}

export class FirestoreCrudService<T extends Entity> {
  // Reference to the Collection in Firestore
  private collection: AngularFirestoreCollection<T>;

  /* We need to ask for the AngularFirestore Injectable
   * and a Collection Name to use in Firestore
   */
  constructor(private afs: AngularFirestore, collectionName: string, private store: Store) {
    // We then create the reference to this Collection
    this.collection = this.afs.collection(collectionName);
  }

  setFirestoreBasePath(path) {
    this.collection = this.afs.collection(path);
  }

  /**
   * We look for the Entity we want to add as well
   * as an Optional Id, which will allow us to set
   * the Entity into a specific Document in the Collection
   */
  add(entity: T, path?: string): Promise<T> {
    // We want to create a Typed Return of the added Entity
    return new Promise<T>((resolve, reject) => {
      if (path) {
        // If there is an path Provided, lets specifically set the Document
        this.collection
          .doc(path)
          .set(entity)
          .then(ref => {
            this.store.dispatch(new AddSuccess('adding your changes was successful! 🎉'))
            resolve(entity);
          }).catch(error => {
            this.store.dispatch(new AddError({statusCode: 500, message: 'We could not add your changes, please try again.'}));
            reject();
          });
      } else {
        // If no ID is set, allow Firestore to Auto-Generate one
        this.collection.add((entity)).then(ref => {
          // Let's make sure we return the newly added ID with Model
          const newentity = {
            id: ref.id,
            ...entity,
          };
          resolve(newentity);
        });
      }
    });
  }

  /**
   * Our get method will fetch a single Entity by it's Document ID
   */
  get(path: string): Observable<T> {
    return this.collection
      .doc<T>(path)
      .snapshotChanges()
      .pipe(
        // We want to map the document into a Typed JS Object
        map(doc => {
          // Only if the entity exists should we build an object out of it
            if (doc.payload.exists) {
              const data = doc.payload.data() as T;
              const payloadId = doc.payload.id;
              return { path: payloadId, ...data };
            } else {
              this.store.dispatch(new AddError({statusCode: 500, message: `We are sorry some error occured during data loading on path: ${this.collection.ref.path}`}));
              throw new Error("Some error occured");
            }
        })
      )}

  /*
   * Our list method will get all the Entities in the Collection
   */
  list(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      // Again we want to build a Typed JS Object from the Document
      map(changes => {
          if(changes && changes.length > 0) {
            return changes.map(a => {
              const data = a.payload.doc.data() as T;
              data.path = a.payload.doc.id;
              return data;
            });
          } else {
            this.store.dispatch(new AddError({statusCode: 500, message: `We are sorry some error occured during data loading on path: ${this.collection.ref.path}`}));
            throw new Error("Some error occured");
          }
      })
    );
  }

  /* Our Update method takes the full updated Entity
   * Including it's ID property which it will use to find the
   * Document. This is a Hard Update.
   */
  update(entity: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection
        .doc<T>(entity.path as string)
        .set(entity)
        .then(() => {
          console.log('updatet');
          this.store.dispatch(new AddSuccess( 'Your update was successful. 🎉'));
          resolve({
            ...entity,
          });
        }).catch(error => {
          console.error(error);
          this.store.dispatch(new AddError({statusCode: 500, message: '❌ We could not update your changes, please try again.'}));
          reject();
        });
    });
  }

  delete(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.collection
        .doc<T>(path)
        .delete()
        .then(() => {
          this.store.dispatch(new AddSuccess( 'Your deletion was successful. 🎉'));
          resolve();
        }).catch(error => {
          console.error(error);
          this.store.dispatch(new AddError({statusCode: 500, message: '❌ We could not delete the entity, please try again.'}));
          reject();
        });
    });
  }
}

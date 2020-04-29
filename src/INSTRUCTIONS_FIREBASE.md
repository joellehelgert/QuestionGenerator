# Firebase
For this project the [Firebase]() is used as headless CMS. This system was choosen because it allows an easy intgration to an angular project with the [@angular/fire](https://github.com/angular/angularfire) library and on the other side provides a lot of documentation on how to integrate the database into (Desktop)-Unity projects. This is important since the purpose of the whole application is to provide a GUI for the [Kinect-Quiz]() to manage the questionaires.

## CRUD on data
To access any data in the firebasestore you need to get a [reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0) to your wished dataset and than you can access the elements with easy CRUD functions.

- get()
- set()
- update()
- delete()

Keep in mind that this calls are still *asynchronus*, therefore it is necessary to wrap it in a 'try-catch'-block. For a better understanding here a basic code snippet using the CRUD Functions.

```
const firestore = firebase.firestore()
const ref = firestore.doc('mygreatpath/socool/document)

ref.set({
  propertyName: value
})

```

### set()
 Set will access already documents if they are available or create a new one.

### document reference
The reference can be done by chaining but is more easily setup and more readabile if you are providing the documents path.


## Authentication
At the moment the firebase ruleset is enabled to allow *everyone* access to the database. This *needs* to be changed as soon as the authentication is implemented. For the authentication Firestore also provides functionality. Please check out [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth?authuser=0)

## TODOS
- [ ] Change firebase access rules
- [ ] Create Auth-Service
- [ ] Create User Management
- [ ] Create Question Management (service?)
- [ ] store different types of questions ?
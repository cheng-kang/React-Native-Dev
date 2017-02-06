# React-Native-Dev
A repository to record my study progress of react native.


## Notes

1. Merging objects by { ...object, anotherVariable }

  I trid to create a new object with the key from firebase data snapshot added to it's val() with the following code:
  
  ```
  // The Wrong Way
  firebase.database().ref(`/events/${id}`)
    .on('value', snapshot => {
      dispatch({ 
        type: Event.GetMyEventListSuccess, 
        payload: { ...snapshot.val(), snapshot.key } 
      });
    });
  ```
  > It's wrong here `{ ...snapshot.val(), snapshot.key }`.
  
  When you try to add a new value to the object, if you don't explictly specify a key for that value, JavaScript will use the variable name to be key of the value. The thing is you should use a `variable` like `snapshot` instead of a `a property or method of a variable` like `snapshot.val()`
  
  The correct way to do this could be either of the following two:
  
  ```
  // #1
  firebase.database().ref(`/events/${id}`)
    .on('value', snapshot => {
      const id = snapshot.key;
      dispatch({ 
        type: Event.GetMyEventListSuccess, 
        payload: { ...snapshot.val(), id } 
      });
    });
  // #2
  firebase.database().ref(`/events/${id}`)
    .on('value', snapshot => {
      dispatch({ 
        type: Event.GetMyEventListSuccess, 
        payload: { ...snapshot.val(), id: snapshot.key } 
      });
    });
  ```

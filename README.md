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

2. Looping Json & Display in React Native

  Use `map()` to generate an `array of Views` and display it.
  
  ```
  render: function() {
     console.log(this.state.list);
     contents = this.state.list.results.map(function (item) {
        return (
          <View key={item.user.email} style={ styles.content }>
            <Text>{item.user.email}</Text>
          </View>
        );
     });
     return (
      <View style={ styles.container }>
        <View style={ styles.header }>
        <Text style={ styles.headerText }>XXX</Text>
        </View>
        <View style={ styles.content }>
            { contents }
        </View>
      </View>
    );
  }
  ```
  > Reference: [Looping Json & Display in React Native](http://stackoverflow.com/a/34253075/5630767)

3. "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object."

  You might **forget to export your component**.
    
4. "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined."
  
  You might make the same mistake as I did : D (Actually, I've made this mistake twice. Shame on me : ))
    ```
      // My Mistake
      // I tried to import this component without thinking
      // because I've wrote so many similar import when writing react-native
      // However, if your component is not exported as a group,
      // you should not import it this way
      import { EventListItem } from './EventListItem';
      
      // Correct code
      import EventListItem from './EventListItem';
      
    ```

5. "undefined is not an object (evaluating '...')"

  Read the information surrounded by single quote, you must have forgot to import related module.
  
6. "invalid data message - all must be length: 3"

  This error occurred when I try to do the following:
  ```
  <Button
    onPress={this.props.registerEvent(id, title)}
  />
  ```
  This is how I fixed the issue:
  ```
  <Button
    onPress={() => { this.props.registerEvent(id, title) }}
  />
  ```
  My understanding to this issue is that you should pass a `callback function` (method body, instead of a invocation of method) to `onPress` property. 

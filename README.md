# react-composition-input
The input component optimized for languages like Chinese, Japanese etc. 

# Why
When we type non-latin languages, e.g. Chinese, we need IME to compose our input untial a word selection has been made. However, when we are changing the input field's value during a composition, the `onChange` event emits before the composition is finished. Which is not what we expect. And frequently calling `onChange` function may affect page performance.

According to [DOM3 spec](https://w3c.github.io/uievents/#event-type-compositionstart), composition events can help us avoid emitting `onChange` event before the composition event is finished. We can use a variable to tag the status of composition. By using `react-composition-input`, the `onInputChange` callback will only be called after `compositionend` event is emitted. 

You can see the difference through the gif below.

![original_input](./assets/original_input.gif)![optimized_input](./assets/optimized_input.gif)


You can read [this](http://blog.evanyou.me/2014/01/03/composition-event/) to know more about DOM composition event.

# Q & A
### Why to detect Chrome and call `handleInputChange` after `compositionend` event?
After Chrome v53, the `compositionend` event is emitted after `textInput` event. It causes that `compositionend` event emitted but `onInputChange` function is not be called. So we need to call `onInputChange` for another time.

You can see the [source code of chromium](https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E!/) for more details.
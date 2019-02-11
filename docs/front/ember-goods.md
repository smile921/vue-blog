# something about emberjs

==========================================================================

## ember-cli/ember-twiddle

An ember cli like web based javascript sharing tool. http://ember-twiddle.com

- Ember Twiddle uses Github Gists as persistence layer. Once you hit Save on a newly created Twiddle, it will create a public Gist under your Github account.
- If you'd like to help out, check out CONTRIBUTING.md We are looking for help maintaining the project. If you have contributed and would like to be made a maintainer, please make a request on the Slack channel or via email.
- Ember Twiddle uses a backend for compiling addons. It is currently located at https://github.com/joostdevries/twiddle-backend

## ember decorators

[ember decorators --The Javascript of the Future, Today!](http://ember-decorators.github.io/ember-decorators/latest/)
Ember Decorators is a project dedicated to exploring and unlocking that future. Its goal is to provide a set of decorators which can be used to write native classes with every standard feature that is available in Ember, along with the transforms and build system required to polyfill and ship them in your app today!
`ember install ember-decorators`

This addon doesn't contain any decorators itself, but includes the core set of
subaddons that are necessary to begin writing Ember using native classes:

- `@ember-decorators/component`
- `@ember-decorators/controller`
- `@ember-decorators/data`
- `@ember-decorators/object`
- `@ember-decorators/service`

### Usage in Applications

In your application where you would normally have:

```js
import Ember from 'ember'

export default Ember.Component.extend({
  foo: Ember.inject.service(),

  bar: Ember.computed('someKey', 'otherKey', function() {
    var someKey = this.get('someKey')
    var otherKey = this.get('otherKey')

    return `${someKey} - ${otherKey}`
  }),

  actions: {
    handleClick() {
      // do stuff
    }
  }
})
```

You replace it with this:

```js
import Component from '@ember/component'
import { action, computed } from '@ember-decorators/object'
import { service } from '@ember-decorators/service'

export default class ExampleComponent extends Component {
  @service foo

  @computed('someKey', 'otherKey')
  get bar() {
    const someKey = this.get('someKey')
    const otherKey = this.get('otherKey')
    return `${someKey} - ${otherKey}`
  }

  @action
  handleClick() {
    // do stuff
  }
}
```

See the [API Documentation](https://ember-decorators.github.io/ember-decorators)
for detailed examples and documentation of the individual decorators.

## 大神说

1. typescript + decorator，可以用的 decorators 参见：http://ember-decorators.github.io/ember-decorators/latest/docs

2. 通过 ember-concurrency 和 ember-lifeline 实现的并发控制（对标 Rx.js 的主要功能，但不是一样的思路）

3. Module Unification，包括新的项目结构

4. Bracket Component，通过 addon : https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill

5. 所谓的 routable component：https://wongpeiyi.github.io/ember-component-routes/

等等，上述这些都将会是未来框架的一部分，只不过 ember 本身就要变成模块化的（会使用新的 packger 进行打包，底层使用 rollup），所以它们以后并不一定会变成一个大的整体的东西，也许就是稳定之后重新命名，然后作为单独的模块供用户使用。

## ember-learn/ember-cli-addon-docs

[Easy documentation for Ember addons.](https://github.com/ember-learn/ember-cli-addon-docs)

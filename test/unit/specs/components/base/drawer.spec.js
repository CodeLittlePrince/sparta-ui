import {
  createVue,
  destroyVM,
  waitImmediate,
  wait,
} from '../../../util'

const title = '我是测试title'
const content = 'content'

describe('Drawer', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', async() => {
    vm = createVue(
      {
        template: `
        <sp-drawer :title='title' v-model='visible'></sp-drawer>
      `,
        data() {
          return {
            title,
            visible: true
          }
        }
      },
      true
    )
    const drawer = vm.$children[0]
    await waitImmediate()
    expect(document.querySelector('.sp-drawer__mask')).to.exist
    expect(vm.$el.querySelector('.sp-drawer__header').textContent.trim()).to.equal(
      title
    )
    expect(drawer.$el.style.display).to.not.equal('none')
  })

  it('render correct content', async() => {
    vm = createVue(
      {
        template: `
          <sp-drawer :title='title' v-model='visible'>
            <span>这是一段信息</span>
            <sp-button @click.native='dialogVisible = false'>取消</sp-button>
            <sp-button type='primary' @click.native='dialogVisible = false'>确定</sp-button>
          </sp-drawer>
      `,

        data() {
          return {
            title: 'drawer test',
            visible: true
          }
        }
      },
      true
    )
    await waitImmediate()
    expect(vm.$el.querySelector('.sp-drawer__body span').textContent).to.equal(
      '这是一段信息'
    )
    const footerBtns = vm.$el.querySelectorAll('.sp-button')
    expect(footerBtns.length).to.equal(2)
    expect(footerBtns[0].querySelector('span').textContent).to.equal('取消')
    expect(footerBtns[1].querySelector('span').textContent).to.equal('确定')
  })

  it('should open and close drawer properly', async() => {
    vm = createVue({
      template: `
        <sp-drawer :title='title' v-model='visible' ref='drawer'>
           <span>${content}</span>
        </sp-drawer>
      `,
      data() {
        return {
          title,
          visible: false
        }
      }
    })
    let drawer = vm.$children[0].$el
    vm.visible = true
    await waitImmediate()
    expect(drawer.style.display).not.to.equal('none')
    vm.visible = false
    await wait(400)
  })

  it('should destroy every child by visible change when destroy-on-close flag is true', async() => {
    vm = createVue({
      template: `
        <sp-drawer :title='title' v-model='visible' :append-to-body='true' :destroy-on-close='true' ref='drawer'>
           <span>${content}</span>
        </sp-drawer>
      `,
      data() {
        return {
          title,
          visible: true
        }
      }
    })

    await waitImmediate()
    expect(vm.$el.querySelector('.sp-drawer__body span').textContent).to.equal(
      content
    )
    vm.visible = false
    await wait(400)
    expect(vm.$el.querySelector('.sp-drawer__body')).not.to.exist
  })

  it('should invoke before-close', async() => {
    const beforeClose = sinon.spy()
    vm = createVue({
      template: `
        <sp-drawer
          :before-close='beforeClose'
          :title='title'
          v-model='visible'
          :destroy-on-close='true'
          ref='drawer'
          >
           <span>${content}</span>
        </sp-drawer>
      `,
      data() {
        return {
          title,
          visible: true,
          beforeClose
        }
      }
    })

    await waitImmediate()
    vm.$refs.drawer.closeDrawer()
    await waitImmediate()
    expect(beforeClose.called).to.be.true
  })

  it('should not show close button when show-close flag is false', async() => {
    vm = createVue({
      template: `
        <sp-drawer :title='title' v-model='visible' ref='drawer' :show-close='false'>
           <span>${content}</span>
        </sp-drawer>
      `,
      data() {
        return {
          title,
          visible: false
        }
      }
    })
    expect(vm.$el.querySelector('.sp-drawer__close-btn')).not.to.exist
  })

  it('should not render header when withHeader attribute is false', () => {
    vm = createVue({
      template: `
        <sp-drawer :title='title' v-model='visible' ref='drawer' :with-header='false'>
           <span>${content}</span>
        </sp-drawer>
      `,
      data() {
        return {
          title,
          visible: true
        }
      }
    })

    expect(vm.$el.querySelector('.sp-drawer__header')).to.not.exist
  })

  describe('directions', () => {
    const renderer = direction => {
      return createVue({
        template: `
         <sp-drawer :title='title' v-model='visible' direction='${direction}'>
            <span>${content}</span>
         </sp-drawer>
        `,
        data: {
          visible: true,
          title
        }
      })
    }
    it('should render from left to right', async() => {
      vm = renderer('left')
      await waitImmediate()
      expect(vm.$el.querySelector('.left')).to.exist
    })

    it('should render from right to left', async() => {
      vm = renderer('right')
      await waitImmediate()
      expect(vm.$el.querySelector('.right')).to.exist
    })

    it('should render from top to bottom', async() => {
      vm = renderer('top')
      await waitImmediate()
      expect(vm.$el.querySelector('.top')).to.exist
    })

    it('should render from bottom to top', async() => {
      vm = renderer('bottom')
      await waitImmediate()
      expect(vm.$el.querySelector('.bottom')).to.exist
    })
  })

  it('events', async() => {
    const open = sinon.spy()
    const opened = sinon.spy()
    const close = sinon.spy()
    const closed = sinon.spy()

    vm = createVue({
      template: `
        <sp-drawer 
            :title='title'
            v-model='visible'
            ref="drawer"
            @open="open"
            @opened="opened"
            @close="close"
            @closed="closed">
          <span>${content}</span>
         </sp-drawer>
      `,
      data() {
        return {
          content,
          visible: false,
          title
        }
      },
      methods: {
        close,
        closed,
        open,
        opened
      }
    })
    vm.visible = true
    await wait(400)
    expect(open.called).to.be.true
    expect(close.called).to.be.false
    expect(closed.called).to.be.false
    vm.visible = false
    await wait(500)
    expect(close.called).to.be.true
  })

  describe('size', () => {
    const renderer = (size, isVertical) =>
      createVue({
        template: `
         <sp-drawer :title='title' v-model='visible' direction='${isVertical ? 'left' : 'top'}' size='${size}'>
            <span>${content}</span>
         </sp-drawer>
      `,
        data: {
          visible: true,
          title
        }
      })

    it('should effect height when drawer is vertical', async() => {
      const size = '50%'
      vm = renderer(size, true)

      expect(vm.$el.querySelector('.sp-drawer').style.width).to.equal('50%')
    })

    it('should effect width when drawer is horizontal', async() => {
      const size = '50%'
      vm = renderer(size, false)
      expect(vm.$el.querySelector('.sp-drawer').style.height).to.equal('50%')
    })
  })
})

export default {
  defaultOpen: '1',
  menuData: [
    {
      title: '标题1',
      link: '/1',
      index: '1'
    },
    {
      title: '标题2',
      link: '/2',
      index: '2',
      child: [
        {
          title: '标题2-1',
          link: '/2-1',
          index: '2-1',
          child: [
            {
              title: '标题2-1-1',
              link: '/2-1-1',
              index: '2-1-1'
            }
          ]
        },
        {
          title: '标题2-2',
          link: '/2-2',
          index: '2-2',
          child: [
            {
              title: '标题2-2-1',
              link: '/2-2-1',
              index: '2-2-1'
            }
          ]
        }
      ]
    },
    {
      title: '标题3',
      link: '/3',
      index: '3',
      child: [
        {
          title: '标题3-1',
          link: '/3-1',
          index: '3-1',
          child: [
            {
              title: '标题3-1-1',
              link: '/3-1-1',
              index: '3-1-1'
            }
          ]
        }
      ]
    }
  ]
}
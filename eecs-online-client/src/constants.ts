/**
 * 分页组件
 */
export const PAGINATION_CONFIGS = Object.freeze({
  page: 1,
  pageSize: 8,
})

/**
 * 单列布局的表单layout
 * 设置在FormItem中 可以添加响应式布局
 * ref: https://ant.design/components/grid/#Col
 */
export const ONE_COLUMN_FORM_LAYOUT = Object.freeze({
  offset: 4,
  span: 12,
});

/**
 * 两列布局的表单layout
* 设置在FormItem中 可以添加响应式布局
 * ref: https://ant.design/components/grid/#Col
 */
export const TWO_COLUMNS_FORM_LAYOUT = Object.freeze({
  // labelCol: {
  //   span: 4,
  // },
  // wrapperCol: {
  //   span: 8,
  // },
  md: 8,
  sm: 24,
});


export const INLINE_FORM_LAYOUT = Object.freeze({
  md: 8,
  sm: 24,
});

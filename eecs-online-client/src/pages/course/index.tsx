import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomTable from '@/components/CustomTable';
import { CourseListItem } from '@/interfaces/course';
import EditModal from './components/EditModal';
import styles from './index.less';
import { PAGINATION_CONFIGS } from '@/constants';
import CustomFilter from '@/components/CustomFilter';
import { StateType } from './models';

const columns: ColumnProps<CourseListItem>[] = [
  { title: '课程名称', dataIndex: 'courseName' },
  { title: '上课地点', dataIndex: 'location' },
  { title: '上课时间', dataIndex: 'time' },
  { title: '上课班级', dataIndex: 'classNames' },
  {
    title: '操作',
    render: (_: string, record: CourseListItem) => (
      <span className={styles.operation}>
        <EditModal title="编辑课程" record={record} onOk={() => { }}>
          <a>编辑课程</a>
        </EditModal>
        <Popconfirm title="确定删除该课程" onConfirm={() => { }}>
          <a href="">删除</a>
        </Popconfirm>
      </span>
    ),
  },
];

interface CourseProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  course: StateType;
}

const Course: React.FC<CourseProps> = props => {
  useEffect(() => {
    props.dispatch({
      type: 'course/fetchCoursePagination',
      payload: { ...PAGINATION_CONFIGS },
    })
  }, []);

  const { data: { page, total, courseList } } = props.course;

  return (
    <div>
      <CustomFilter onSubmit={value => { console.log(value) }} />
      <div className={styles.buttons}>
        <EditModal title="新增课程" record={{}} onOk={() => { }}>
          <Button type="primary">新增课程</Button>
        </EditModal>
      </div>
      <CustomTable
        loading={props.loading}
        columns={columns}
        dataSource={courseList}
        current={page}
        total={total}
        rowKey={(record: CourseListItem) => record.id}
        onPagination={(current: number) => {
          props.dispatch({
            type: 'course/fetchCoursePagination',
            payload: { ...PAGINATION_CONFIGS, page: current },
          })
        }}
      />
    </div>
  )
}

const mapStaetToProps = ({
  course,
  loading,
}: {
  course: StateType;
  loading: {
    models: {
      [key: string]: boolean;
    };
  };
}) => ({
  course,
  loading: loading.models.course,
})

export default connect(mapStaetToProps)(Course);

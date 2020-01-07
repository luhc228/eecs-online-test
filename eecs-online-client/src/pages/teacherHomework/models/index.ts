import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  TeacherHomeworkTableData,
  TeacherHomeworkFilterFieldsModel,
  PaginationParamsModel,
} from '@/interfaces/teacherHomework';
import * as homeworkService from '../services';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  data: TeacherHomeworkTableData;
  filterFields: TeacherHomeworkFilterFieldsModel;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: { save: Reducer<StateType>; changeFilterFields: Reducer<StateType> };
  effects: {
    fetchHomeworkPagination: Effect<StateType>;
    removeHomework: Effect<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'homework',

  state: {
    data: DEFAULT_TABLE_PAGINATION_STATE,
    filterFields: {
      homeworkName: undefined,
      courseName: undefined,
      content: undefined,
      description: undefined,
      deadline: undefined,
      courseId: undefined,
    },
  },

  reducers: {
    save(state: any, { payload }: { type: string; payload: { data: HomeworkTableData } }) {
      return { ...state, data: payload.data };
    },

    changeFilterFields(
      state: any,
      { payload }: { type: string; payload: { filterFields: HomeworkFieldsModel } },
    ) {
      return { ...state, filterFields: payload.filterFields };
    },
  },

  effects: {
    /**
     * 获取班级信息分页
     * 包括信息筛选
     */
    *fetchHomeworkPagination(
      { payload }: { type: string; payload: { data: PaginationParamsModel } },
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(homeworkService.fetchHomeworkPagination, payload.data);
      const { data } = response;
      console.log('data', data);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },

    /**
     * 删除某个课程
     */
    *removeHomework(
      { payload }: { type: string; payload: { homeworkId: number } },
      { call, put, select }: EffectsCommandMap,
    ) {
      yield call(homeworkService.removeHomework, payload.homeworkId);

      const paginationData = yield select((state: any) => {
        const {
          teacherHomework: { data, filterFields },
        } = state;
        const { page, pageSize } = data;
        return {
          page,
          pageSize,
          ...filterFields,
        };
      });

      yield put({
        type: 'fetchHomeworkPagination',
        payload: {
          page: paginationData,
        },
      });
    },
  },
};

export default Model;

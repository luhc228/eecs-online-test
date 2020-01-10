/**
 * 定义共用api接口
 */
import request from '@/utils/request';

/**
 * 获取学院信息列表
 */
export function fetchCollegeList() {
  return request.get('/college/detail');
}

/**
 * 获取虚拟班级信息列表
 */
export function fetchVirClassList() {
  return request.get('/vir_class/list');
}

/**
 * 获取真实班级信息列表
 */
export function fetchClassList() {
  return request.get('/student/true_class');
}

/**
 * 获取课程信息列表
 */
export function fetchCourseList(teacherId?: string, studentId?: string) {
  return request.get('/course/list', {
    params: {
      teacherId,
      studentId,
    },
  });
}

import groupTasks from '../utils/group-tasks.util';
import { api } from '.';

export const tasksApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: '/tasks',
        method: 'GET',
      }),
      providesTags: ['Session', 'Tasks'],
      transformResponse: (response) => groupTasks(response ?? []),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData('getTasks', undefined, (draft) =>
              draft.map((item) =>
                item.title === data.status
                  ? { ...item, tasks: [...item.tasks, data] }
                  : item
              )
            )
          );
        } catch {}
      },
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData('getTasks', undefined, (draft) =>
              draft.map((item) =>
                item.title === data.status
                  ? {
                      ...item,
                      tasks: item.tasks.map((task) =>
                        task.id === data.id ? { ...task, ...data } : task
                      ),
                    }
                  : item
              )
            )
          );
        } catch {}
      },
    }),
    reorderTasks: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            api.util.updateQueryData('getTasks', undefined, (draft) =>
              draft.map((item) => ({
                ...item,
                tasks: item.tasks.filter((task) => task.id !== id),
              }))
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useReorderTasksMutation,
  useDeleteTaskMutation,
} = tasksApi;

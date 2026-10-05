import Icon from "../common/Icon";
import { activity, quickActions } from '../../data/dashboardData'

export default function ActivityHub({ onAction }) {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm lg:col-span-2">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4">
          <div className="flex items-center gap-2">
            <Icon className="text-primary">history</Icon>
            <h3 className="text-headline-sm text-on-surface">Academic Activity &amp; Audit Log</h3>
          </div>
          <span className="text-label-sm text-on-surface-variant">Real-time Operations</span>
        </div>

        <div className="divide-y divide-outline-variant">
          {activity.map((item) => (
            <div key={item.time + item.icon} className="flex items-start justify-between gap-4 py-3.5">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-lg p-2 ${item.box}`}>
                  <Icon className="text-base">{item.icon}</Icon>
                </div>
                <div>
                  <p className="text-body-sm font-medium text-on-surface">{item.text}</p>
                  <p className="text-label-sm text-on-surface-variant">{item.meta}</p>
                </div>
              </div>
              <span className="whitespace-nowrap text-label-sm text-on-surface-variant">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div>
          <div className="mb-4 flex items-center gap-2 border-b border-outline-variant pb-4">
            <Icon className="text-primary">touch_app</Icon>
            <h3 className="text-headline-sm text-on-surface">Quick Action Hub</h3>
          </div>

          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => onAction(action.action)}
                className="group flex w-full items-center justify-between rounded-lg border border-outline-variant bg-surface-container-low p-3.5 text-left transition-all hover:bg-surface-container"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${action.iconBox}`}>
                    <Icon className="text-base">{action.icon}</Icon>
                  </div>
                  <div>
                    <div className="text-label-md font-semibold text-on-surface group-hover:text-primary">{action.title}</div>
                    <div className="text-label-sm text-on-surface-variant">{action.description}</div>
                  </div>
                </div>
                <Icon className="text-outline transition-transform group-hover:translate-x-1 group-hover:text-primary">chevron_right</Icon>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-outline-variant pt-3">
          <span className="flex items-center gap-2 text-label-sm text-on-surface-variant">
            <span className="h-2 w-2 rounded-full bg-primary-container" />
            <span>System Health: Nominal</span>
          </span>
          <span className="text-label-sm text-on-surface-variant">v4.8.2-prod</span>
        </div>
      </div>
    </section>
  );
}

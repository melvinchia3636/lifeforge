/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ScriptableContext,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import {} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

function msToTime(ms) {
  const seconds = (ms / 1000).toFixed(1);
  const minutes = (ms / (1000 * 60)).toFixed(1);
  const hours = (ms / (1000 * 60 * 60)).toFixed(1);
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days";
}

export const data = {
  labels: ["Images", "Videos", "Musics", "Documents"],
  datasets: [
    {
      label: "Storage occupation",
      data: [19, 12, 3, 5],
      backgroundColor: [
        "rgba(244, 63, 94, 0.2)",
        "rgba(245 ,158, 11, 0.2)",
        "rgba(59, 130, 246, 0.2)",
        "rgba(34, 197, 94, 0.2)",
      ],
      borderColor: [
        "rgba(244, 63, 94, 1)",
        "rgba(245, 158, 11, 1)",
        "rgba(59, 130, 246, 1)",
        "rgba(34, 197, 94, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const raw = [
  ["2023-11-23T00:00:00Z", 12180000],
  ["2023-11-22T00:00:00Z", 7620000],
  ["2023-11-21T00:00:00Z", 16200000],
  ["2023-11-20T00:00:00Z", 18360000],
  ["2023-11-18T00:00:00Z", 2940000],
  ["2023-11-17T00:00:00Z", 16020000],
  ["2023-11-16T00:00:00Z", 2040000],
  ["2023-11-15T00:00:00Z", 3480000],
  ["2023-11-14T00:00:00Z", 7200000],
  ["2023-11-11T00:00:00Z", 5580000],
  ["2023-11-10T00:00:00Z", 8640000],
  ["2023-11-08T00:00:00Z", 480000],
  ["2023-11-06T00:00:00Z", 420000],
  ["2023-11-05T00:00:00Z", 9960000],
  ["2023-11-04T00:00:00Z", 13620000],
  ["2023-11-03T00:00:00Z", 5940000],
  ["2023-11-02T00:00:00Z", 13500000],
  ["2023-11-01T00:00:00Z", 11640000],
  ["2023-10-31T00:00:00Z", 16500000],
  ["2023-10-29T00:00:00Z", 13800000],
  ["2023-10-28T00:00:00Z", 22800000],
  ["2023-10-27T00:00:00Z", 7380000],
  ["2023-10-26T00:00:00Z", 8820000],
  ["2023-10-25T00:00:00Z", 960000],
  ["2023-10-24T00:00:00Z", 10440000],
].reverse();

const data2 = {
  labels: raw.map(([date]) =>
    new Date(date).toDateString().split(" ").slice(1, 3).join(" ")
  ),
  datasets: [
    {
      label: "Code time",
      data: raw.map(([, value]) => value / 3600000),
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(20,184,166,0.2)");
        gradient.addColorStop(1, "rgba(20,184,166,0)");
        return gradient;
      },
      fill: "origin",
      borderColor: "rgba(20, 184, 166, 1)",
      borderWidth: 1,
      tension: 0.4,
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(context.parsed / 100);
          }
          return label;
        },
      },
    },
    legend: {
      labels: {
        color: "rgb(250, 250, 250)",
      },
      position: "bottom",
    },
  },
};

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += msToTime(context.parsed.y * 3600000);
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        type: "time",
        callback: function (label, index, labels) {
          return Math.round(label) + "h";
        },
      },
      grid: {
        drawOnChartArea: false,
      },
      border: {
        color: "rgba(163, 163, 163, 0.5)",
      },
    },
    x: {
      grid: {
        drawOnChartArea: false,
      },
      border: {
        color: "rgba(163, 163, 163, 0.5)",
      },
    },
  },
};

function App() {
  return (
    <main className="flex bg-neutral-900 text-neutral-50 h-screen w-full">
      <aside className="w-1/5 flex-shrink-0 bg-neutral-800/50 h-full flex flex-col rounded-r-2xl">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center text-neutral-50 text-xl p-6 gap-2 font-semibold">
            <Icon icon="tabler:hammer" className="text-3xl text-teal-500" />
            <div>
              LifeForge<span className="text-teal-500 text-3xl"> .</span>
            </div>
          </h1>
          <button className="p-8 text-neutral-500 hover:text-neutral-100 transition-all">
            <Icon icon="tabler:menu" className="text-2xl" />
          </button>
        </div>
        <ul className="flex flex-col mt-6 pb-6 overflow-y-hidden hover:overflow-y-scroll">
          {(
            [
              ["Dashboard", "tabler:layout-dashboard"],
              ["divider"],
              ["title", "Productivity"],
              ["Todo", "tabler:list-check"],
              ["Calendar", "tabler:calendar"],
              ["divider"],
              ["title", "Development"],
              [
                "Projects",
                "tabler:clipboard",
                [
                  ["Kanban", "tabler:layout-columns"],
                  ["List", "tabler:layout-list"],
                  ["Gantt", "tabler:arrow-autofit-content"],
                ],
              ],
              ["Code Time", "tabler:code"],
              ["Github Stats", "tabler:brand-github"],
              ["divider"],
              ["title", "Study"],
              [
                "Notes",
                "tabler:notebook",
                [
                  ["High School", "tabler:bell-school"],
                  ["University", "tabler:school"],
                ],
              ],
              [
                "Reference Books",
                "tabler:books",
                [
                  ["Mathematics", "tabler:calculator"],
                  ["Physics", "tabler:atom"],
                ],
              ],
              ["divider"],
              ["title", "Lifestyle"],
              ["Blog", "tabler:file-text"],
              [
                "Travel",
                "tabler:plane",
                [
                  ["Places", "tabler:map-2"],
                  ["Trips", "tabler:map-pin"],
                  ["Photos", "tabler:photo"],
                ],
              ],
              ["Achievements", "tabler:award"],
              ["divider"],
              ["title", "Finance"],
              [
                "Wallet",
                "tabler:currency-dollar",
                [
                  ["Balance", "tabler:wallet"],
                  ["Transactions", "tabler:arrows-exchange"],
                  ["Budgets", "tabler:coin"],
                  ["Reports", "tabler:chart-bar"],
                ],
              ],
              ["Wishlist", "tabler:heart"],
              ["divider"],
              ["title", "Confidential"],
              ["Contacts", "tabler:users"],
              ["Passwords", "tabler:key"],
              ["divider"],
              ["title", "storage"],
              ["Documents", "tabler:file"],
              ["Images", "tabler:photo"],
              ["Videos", "tabler:video"],
              ["Musics", "tabler:music"],
              ["divider"],
              ["title", "Settings"],
              ["Settings", "tabler:settings"],
              ["Plugins", "tabler:plug"],
              ["Personalization", "tabler:palette"],
              ["Server Status", "tabler:server"],
              ["divider"],
            ] as [string, string, string[][] | undefined][]
          ).map(([name, icon, subsection], index) =>
            name !== "divider" ? (
              name !== "title" ? (
                <>
                  <li
                    className={`flex items-center text-neutral-100 gap-6 px-4 relative transition-all font-medium ${
                      index === 0
                        ? "after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-8 after:bg-teal-500 after:rounded-full"
                        : "text-neutral-400"
                    }`}
                  >
                    <div
                      className={`flex gap-6 items-center w-full rounded-lg p-4 hover:bg-neutral-800 ${
                        index === 0 ? "bg-neutral-800" : ""
                      }`}
                    >
                      <Icon icon={icon} className="w-6 h-6 flex-shrink-0" />
                      <div className="flex items-center justify-between w-full">
                        {name}
                        {subsection && (
                          <Icon
                            icon="tabler:chevron-right"
                            className="text-neutral-400 stroke-[2px]"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                  {subsection && (
                    <ul className="flex flex-col gap-2 hidden">
                      {subsection.map(([name, icon]) => (
                        <li className="flex items-center gap-4 py-4 pl-[4.6rem] hover:bg-neutral-800 transition-all font-medium text-neutral-400">
                          <Icon icon={icon} className="w-6 h-6" />
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <li className="flex items-center gap-4 py-4 px-8 transition-all font-semibold uppercase text-sm tracking-widest text-neutral-600">
                  {icon}
                </li>
              )
            ) : (
              <li className="h-px flex-shrink-0 bg-neutral-700 my-4" />
            )
          )}
        </ul>
      </aside>
      <section className="flex pb-0 h-full w-full flex-col">
        <header className="flex items-center gap-8 justify-between w-full p-12">
          <div className="flex items-center gap-4 p-4 bg-neutral-800/50 w-full rounded-lg">
            <Icon icon="tabler:search" className="text-neutral-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Quick navigate & search ... (Press / to focus)"
              className="bg-transparent text-neutral-100 placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-4 text-neutral-500 rounded-lg hover:bg-neutral-800 hover:text-neutral-100 transition-all relative">
              <Icon icon="tabler:bell" className="text-2xl" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-800" />
              <div className="flex flex-col">
                <div className="text-neutral-50 font-semibold">John Doe</div>
                <div className="text-neutral-500 text-sm">Administrator</div>
              </div>
              <Icon
                icon="tabler:chevron-down"
                className="text-neutral-400 stroke-[2px]"
              />
            </div>
          </div>
        </header>
        <div className="overflow-y-auto px-12 flex flex-col w-full">
          <div className="w-full flex flex-col mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-semibold text-neutral-50">
                Dashboard
              </h1>
              <button className="p-4 text-neutral-500 rounded-lg hover:bg-neutral-800 hover:text-neutral-100 transition-all">
                <Icon icon="tabler:dots-vertical" className="text-2xl" />
              </button>
            </div>
            <div className="grid grid-cols-4 grid-rows-3 w-full mt-6 gap-6">
              <section className="flex flex-col gap-4 p-6 bg-neutral-800/50 rounded-lg w-full col-span-1">
                <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Icon icon="tabler:server" className="text-2xl" />
                  <span className="ml-2">Storage Status</span>
                </h1>
                <div className="w-full h-full flex items-center">
                  <Doughnut data={data} options={options} />
                </div>
                <p className="font-medium text-center text-lg">
                  520 GB of 1 TB used
                </p>
              </section>
              <section className="flex flex-col gap-4 p-6 bg-neutral-800/50 rounded-lg w-full col-span-2 h-full">
                <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Icon icon="tabler:chart-line" className="text-2xl" />
                  <span className="ml-2">Code Time</span>
                </h1>
                <div className="w-full h-72">
                  <Line data={data2} options={options2} />
                </div>
              </section>
              <section className="flex flex-col gap-4 p-6 bg-neutral-800/50 rounded-lg w-full col-span-1">
                <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Icon icon="tabler:calendar" className="text-2xl" />
                  <span className="ml-2">Today's Event</span>
                </h1>
                <ul className="flex flex-col gap-4 h-full">
                  <li className="flex items-center flex-1 justify-between gap-4 p-4 bg-neutral-800 rounded-lg">
                    <div className="w-1.5 h-full rounded-full bg-rose-500" />
                    <div className="flex flex-col w-full gap-1">
                      <div className="text-neutral-50 font-semibold">
                        Coldplay's concert
                      </div>
                      <div className="text-neutral-500 text-sm">8:00 PM</div>
                    </div>
                  </li>
                  <li className="flex items-center flex-1 justify-between gap-4 p-4 bg-neutral-800 rounded-lg">
                    <div className="w-1.5 h-full rounded-full bg-purple-500" />
                    <div className="flex flex-col w-full gap-1">
                      <div className="text-neutral-50 font-semibold">
                        Meeting with client
                      </div>
                      <div className="text-neutral-500 text-sm">10:00 PM</div>
                    </div>
                  </li>
                  <li className="flex items-center flex-1 justify-between gap-4 p-4 bg-neutral-800 rounded-lg">
                    <div className="w-1.5 h-full rounded-full bg-purple-500" />
                    <div className="flex flex-col w-full gap-1">
                      <div className="text-neutral-50 font-semibold">
                        Deadline for project
                      </div>
                      <div className="text-neutral-500 text-sm">11:59 PM</div>
                    </div>
                  </li>
                </ul>
              </section>
              <section className="flex flex-col gap-4 p-8 bg-neutral-800/50 rounded-lg w-full col-span-2 row-span-1">
                <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Icon icon="tabler:wallet" className="text-2xl" />
                  <span className="ml-2">Wallet Balance</span>
                </h1>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center justify-between gap-4 p-4 pl-6 bg-neutral-800 rounded-lg hover:bg-neutral-700/50 transition-all">
                    <div className="flex items-center gap-4">
                      <Icon icon="tabler:cash" className="w-6 h-6" />
                      <div className="flex flex-col">
                        <div className="text-neutral-50 font-semibold">
                          Cash
                        </div>
                        <div className="text-neutral-500 text-sm">
                          RM 520.00
                        </div>
                      </div>
                    </div>
                    <button className="p-4 text-neutral-500 rounded-lg transition-all">
                      <Icon icon="tabler:chevron-right" className="text-2xl" />
                    </button>
                  </li>
                  <li className="flex items-center justify-between gap-4 p-4 pl-6 bg-neutral-800 rounded-lg hover:bg-neutral-700/50 transition-all">
                    <div className="flex items-center gap-4">
                      <Icon icon="tabler:device-mobile" className="w-6 h-6" />
                      <div className="flex flex-col">
                        <div className="text-neutral-50 font-semibold">
                          Touch N' Go e-Wallet
                        </div>
                        <div className="text-neutral-500 text-sm">
                          RM 128.00
                        </div>
                      </div>
                    </div>
                    <button className="p-4 text-neutral-500 rounded-lg transition-all">
                      <Icon icon="tabler:chevron-right" className="text-2xl" />
                    </button>
                  </li>
                  <li className="flex items-center justify-between gap-4 p-4 pl-6 bg-neutral-800 rounded-lg hover:bg-neutral-700/50 transition-all">
                    <div className="flex items-center gap-4">
                      <Icon icon="tabler:building-bank" className="w-6 h-6" />
                      <div className="flex flex-col">
                        <div className="text-neutral-50 font-semibold">
                          Bank Account
                        </div>
                        <div className="text-neutral-500 text-sm">
                          RM 12,487.00
                        </div>
                      </div>
                    </div>
                    <button className="p-4 text-neutral-500 rounded-lg transition-all">
                      <Icon icon="tabler:chevron-right" className="text-2xl" />
                    </button>
                  </li>
                </ul>
              </section>
              <section className="flex flex-col gap-4 p-8 bg-neutral-800/50 rounded-lg w-full col-span-2 row-span-2">
                <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Icon icon="tabler:clipboard-list" className="text-2xl" />
                  <span className="ml-2">Todo List</span>
                </h1>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center justify-between border-l-4 border-indigo-500 gap-4 p-4 px-6 bg-neutral-800 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="text-neutral-50 font-semibold">
                        Buy groceries
                      </div>
                      <div className="text-rose-500 text-sm">
                        10:00 AM, 23 Nov 2023 (overdue 8 hours)
                      </div>
                    </div>
                    <button className="w-6 h-6 border-2 border-neutral-500 rounded-full hover:border-orange-500 transition-all" />
                  </li>
                  <li className="flex items-center justify-between border-l-4 border-orange-500 gap-4 p-4 px-6 bg-neutral-800 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="text-neutral-50 font-semibold">
                        Do homework
                      </div>
                      <div className="text-neutral-500 text-sm">
                        00:00 AM, 31 Jan 2024
                      </div>
                    </div>
                    <button className="w-6 h-6 border-2 border-neutral-500 rounded-full hover:border-orange-500 transition-all" />
                  </li>
                  <li className="flex items-center justify-between border-l-4 border-orange-500 gap-4 p-4 px-6 bg-neutral-800 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="text-neutral-50 font-semibold">
                        Start doing revision for SPM Sejarah
                      </div>
                      <div className="text-neutral-500 text-sm">
                        00:00 AM, 31 Jan 2024
                      </div>
                    </div>
                    <button className="w-6 h-6 border-2 border-neutral-500 rounded-full hover:border-orange-500 transition-all" />
                  </li>
                </ul>
              </section>
              <section className="flex flex-col gap-4 p-8 bg-neutral-800/50 rounded-lg w-full col-span-2 row-span-1">
                <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Icon icon="tabler:calendar" className="text-2xl" />
                  <span className="ml-2">Calendar</span>
                </h1>
                <div className="w-full h-full">
                  <div className="flex items-center justify-between mb-6">
                    <button className="p-4 text-neutral-500 rounded-lg hover:bg-neutral-700/50 transition-all">
                      <Icon icon="tabler:chevron-left" className="text-2xl" />
                    </button>
                    <div className="text-neutral-50 text-lg font-semibold">
                      November 2023
                    </div>
                    <button className="p-4 text-neutral-500 rounded-lg hover:bg-neutral-700/50 transition-all">
                      <Icon icon="tabler:chevron-right" className="text-2xl" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div className="flex items-center justify-center text-neutral-500 text-sm">
                          {day}
                        </div>
                      )
                    )}
                    {Array(35)
                      .fill(0)
                      .map((_, index) =>
                        (() => {
                          const date = new Date();

                          const firstDay =
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              1
                            ).getDay() - 1;

                          const lastDate = new Date(
                            date.getFullYear(),
                            date.getMonth() + 1,
                            0
                          ).getDate();

                          const lastDateOfPrevMonth =
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              0
                            ).getDate() - 1;

                          const actualIndex =
                            firstDay > index
                              ? lastDateOfPrevMonth - firstDay + index + 2
                              : index - firstDay + 1 > lastDate
                              ? index - lastDate - firstDay + 1
                              : index - firstDay + 1;

                          return (
                            <div
                              className={`flex items-center flex-col gap-1 relative isolate text-sm ${
                                firstDay > index ||
                                index - firstDay + 1 > lastDate
                                  ? "text-neutral-600"
                                  : "text-neutral-100"
                              } ${
                                actualIndex === date.getDate()
                                  ? "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-10 after:h-10 after:border after:border-teal-500 after:bg-teal-500/10 after:z-[-1] after:rounded-md"
                                  : ""
                              }`}
                            >
                              <span>{actualIndex}</span>
                              {(() => {
                                const randomTrue = Math.random() > 0.7;
                                return randomTrue &&
                                  !(
                                    firstDay > index ||
                                    index - firstDay + 1 > lastDate
                                  ) ? (
                                  <div className="w-3 h-0.5 rounded-full bg-rose-500" />
                                ) : (
                                  ""
                                );
                              })()}
                            </div>
                          );
                        })()
                      )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

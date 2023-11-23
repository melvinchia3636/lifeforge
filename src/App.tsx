import { Icon } from "@iconify/react";

function App() {
  return (
    <main className="flex bg-neutral-900 h-screen w-full">
      <aside className="w-1/5 flex-shrink-0 bg-neutral-800/50 h-full flex flex-col rounded-r-2xl">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center text-neutral-50 text-xl p-6 gap-2 font-semibold">
            <Icon icon="tabler:hammer" className="text-3xl text-teal-500" />
            <div>
              LifeForge<span className="text-teal-500 text-3xl"> .</span>
            </div>
          </h1>
          <button className="p-8 text-neutral-500 hover:text-neutral-100 transition-all">
            <Icon icon="tabler:settings" className="text-2xl" />
          </button>
        </div>
        <ul className="flex flex-col mt-6 pb-6 overflow-y-hidden hover:overflow-y-scroll">
          {(
            [
              ["Dashboard", "tabler:layout-dashboard"],
              ["divider"],
              ["title", "Production"],
              ["Todo", "tabler:list-check"],
              ["Calendar", "tabler:calendar"],
              [
                "Projects",
                "tabler:clipboard",
                [
                  ["Kanban", "tabler:layout-columns"],
                  ["List", "tabler:layout-list"],
                  ["Gantt", "tabler:arrow-autofit-content"],
                ],
              ],
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
              [
                "Finance",
                "tabler:currency-dollar",
                [
                  ["Balance", "tabler:wallet"],
                  ["Transactions", "tabler:arrows-exchange"],
                  ["Budgets", "tabler:coin"],
                  ["Reports", "tabler:chart-bar"],
                ],
              ],
              ["divider"],
              ["title", "Confidential"],
              ["Contacts", "tabler:users"],
              ["Passwords", "tabler:key"],
              ["divider"],
              ["title", "storage"],
              ["Files", "tabler:file"],
              ["Images", "tabler:photo"],
              ["Videos", "tabler:video"],
              ["Musics", "tabler:music"],
              ["divider"],
              ["title", "Settings"],
              ["Settings", "tabler:settings"],
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
                    <ul className="flex flex-col gap-2">
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
                <li className="flex items-center gap-4 pt-4 pb-2 px-8 transition-all font-semibold uppercase text-sm tracking-widest text-neutral-600">
                  {icon}
                </li>
              )
            ) : (
              <li className="h-px flex-shrink-0 bg-neutral-700 my-4" />
            )
          )}
        </ul>
      </aside>
      <section className="flex p-12 h-full w-full flex-col">
        <header className="flex items-center gap-8 justify-between w-full mb-12">
          <div className="flex items-center gap-4 p-4 bg-neutral-800/50 w-full rounded-lg">
            <Icon icon="tabler:search" className="text-neutral-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Quick navigate & search ... (Press / to focus)"
              className="bg-transparent text-neutral-100 placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-4 text-neutral-500 rounded-lg hover:bg-neutral-800 hover:text-neutral-100 transition-all">
              <Icon icon="tabler:bell" className="text-2xl" />
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
        <h1 className="text-4xl font-semibold text-neutral-50">Dashboard</h1>
      </section>
    </main>
  );
}

export default App;

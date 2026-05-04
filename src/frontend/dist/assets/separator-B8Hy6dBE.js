import { c as createLucideIcon, M as MediaType, j as jsxRuntimeExports, b as cn, X, r as reactExports, P as Primitive } from "./index-BMKmhz2w.js";
import { C as Camera, M as Music } from "./index-Ba0MObz_.js";
import { F as Film, S as Skeleton } from "./skeleton-DjalC40G.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function MediaThumbnail({
  item,
  className,
  onClick,
  showCaption = false
}) {
  const category = item.mediaType;
  const url = item.blob.getDirectURL();
  const Icon = category === MediaType.photo ? Camera : category === MediaType.video ? Film : Music;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "relative group overflow-hidden rounded-xl bg-secondary cursor-pointer",
        "w-full aspect-square transition-smooth hover:scale-[1.02]",
        className
      ),
      onClick,
      onKeyDown: (e) => e.key === "Enter" && (onClick == null ? void 0 : onClick()),
      "aria-label": item.name,
      children: [
        category === MediaType.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: url,
            alt: item.name,
            className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
            loading: "lazy"
          }
        ),
        category === MediaType.video && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: url,
              className: "w-full h-full object-cover",
              muted: true,
              preload: "metadata"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-black/60 p-3 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 20, className: "text-foreground fill-foreground" }) }) })
        ] }),
        category === MediaType.audio && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-secondary gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full gradient-primary p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 24, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-end h-6", children: [3, 6, 4, 8, 5, 7, 3, 6, 4].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-1 rounded-full bg-primary/60",
              style: { height: `${h * 3}px` }
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 rounded-md bg-black/60 backdrop-blur-sm p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12, className: "text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" }),
        showCaption && item.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground truncate", children: item.caption }) })
      ]
    }
  );
}
const colClass = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
};
function MediaTypeBar({ items }) {
  const photos = items.filter((m) => m.mediaType === MediaType.photo).length;
  const videos = items.filter((m) => m.mediaType === MediaType.video).length;
  const audios = items.filter((m) => m.mediaType === MediaType.audio).length;
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4 text-xs text-muted-foreground", children: [
    photos > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 12, className: "text-primary" }),
      photos,
      " photo",
      photos !== 1 ? "s" : ""
    ] }),
    videos > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 12, className: "text-chart-2" }),
      videos,
      " video",
      videos !== 1 ? "s" : ""
    ] }),
    audios > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 12, className: "text-chart-3" }),
      audios,
      " audio file",
      audios !== 1 ? "s" : ""
    ] })
  ] });
}
function MediaGrid({
  items,
  isLoading = false,
  onItemClick,
  onDeleteItem,
  emptyState,
  columns = 4
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${colClass[columns]} gap-3`, children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, i)) });
  }
  if (items.length === 0) {
    return emptyState ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: emptyState }) : null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaTypeBar, { items }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${colClass[columns]} gap-3`, children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative group",
        "data-ocid": `media.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MediaThumbnail,
            {
              item,
              onClick: () => onItemClick == null ? void 0 : onItemClick(item),
              showCaption: true
            }
          ),
          onDeleteItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onDeleteItem(item);
              },
              className: "absolute top-2 left-2 rounded-md bg-black/70 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-smooth text-foreground hover:text-destructive",
              "aria-label": `Delete ${item.name}`,
              "data-ocid": `media.delete_button.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 })
            }
          ),
          item.mediaType !== MediaType.photo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-black/60 backdrop-blur-sm text-foreground px-1.5 py-0.5 rounded", children: item.mediaType }) })
        ]
      },
      item.id.toString()
    )) })
  ] });
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
export {
  ArrowLeft as A,
  MediaGrid as M,
  Separator as S
};

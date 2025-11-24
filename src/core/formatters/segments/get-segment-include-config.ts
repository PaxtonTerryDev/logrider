import type { LogRiderConfig } from "../../../config/global-config";
import type { LogSegment } from "../../constants";

export type SegmentInclude = Record<LogSegment, boolean>;

export function getSegmentInclude(config: LogRiderConfig, )
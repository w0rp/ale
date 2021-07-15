/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
exports.CallHierarchyFeature = (Base) => {
    return class extends Base {
        get callHierarchy() {
            return {
                onPrepare: (handler) => {
                    this.connection.onRequest(vscode_languageserver_protocol_1.Proposed.CallHierarchyPrepareRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
                    });
                },
                onIncomingCalls: (handler) => {
                    const type = vscode_languageserver_protocol_1.Proposed.CallHierarchyIncomingCallsRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onOutgoingCalls: (handler) => {
                    const type = vscode_languageserver_protocol_1.Proposed.CallHierarchyOutgoingCallsRequest.type;
                    this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                }
            };
        }
    };
};
//# sourceMappingURL=callHierarchy.proposed.js.map
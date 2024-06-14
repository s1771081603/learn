import * as dataCockpitApi from '@/utils/api/screenData';

/**
 * 获取所需的 api 方法 
 * @param {*} apiModule 模块
 *    dept
 *    supplier
 *    operation
 *    cuser
 *    accidentChina
 *    accidentGlobal
 */
export const getMappingApi = (apiModule) => {
  return dataCockpitApi[`datacockpit${apiModule.slice(0, 1).toUpperCase() + apiModule.slice(1)}`]
};

let apiData;

/**
 * 获取绘图数据
 * @param {*} modelName
 *    C端用户统计: cuser
 *    需求分布: projectDetail
 *    事件统计 - china: accidentChina
 *    事件统计 - global: accidentGlobal
 *    运维统计: operation
 *
 *    成本统计: 成本统计数据是总计数据 取自 部门数据/供应商数据
 *    部门统计: deptSts
 *    供应商统计: supplierSts
 * @returns
 */
export const fetchData = (modelName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: { code: 0, data: apiData[modelName] }
      })
    }, 500)
  })
}

apiData = {
  cuser: [
    { key: 'App总用户数', value: '960300' },
    // { key: 'App在线用户人数', value: 5654 },
    // { key: 'App新增用户数', value: 5642 },
    // { key: 'App新增用户注册率', value: '56.42%' },
    { key: 'App日活跃用户率', value: '11.51%' },
    { key: 'App月活跃用户率', value: '51.43%' },
    { key: '绑车数', value: '243852' },

    { key: '小程序总用户数', value: '4669500' },
    { key: '小程序新增用户注册率', value: '28.42%' },
    { key: '小程序日活跃用户率', value: '0.28%' },
    { key: '小程序月活跃用户率', value: '5.82%' },
    // { key: '小程序日活用户数', value: 6420, unit: '条' },
    // { key: '小程序用户新增率', value: '56.4%', unit: '条' },
  ],
  projectDetail: {
    req: {
      total: 582,     // 需求总数
      waiting: 170,    // 待排期
      doing: 8,      // 进行中
      finished: 404,   // 已完成
    },
    risk: {
      total: 582,     // 风险总数
      confirmed: 404,   // 风险已确认
    }
  },
  accidentChina: {
    total: '100',          // 质量问题总数
    details: [
      {
        key: '2024年未解决事件',        // 项目/分类名称
        value: '174',       // 问题数量
        percentage: 0.3,   // 所占比例
      },
      {
        key: '2024年车控相关事件',
        value: '79',
        percentage: 0.3,
      },
      // {
      //   key: '中台',
      //   value: '40',
      //   percentage: 0.4,
      // },
    ]
  },
  accidentGlobal: {
    total: '100',           // 质量问题总数
    details: [
      {
        key: 'RO/VCC/TIE NSC',        // 项目/分类名称
        value: '16',                  // 总数
        percentage: 0.4,              // 问题比例
        doing: '16',                  // 进行中数量
        remain: 0,                  // 剩余数量
      },
      {
        key: 'Mobile app APAC Focus',
        value: '8',
        percentage: 0.4,
        doing: '6',
        remain: '2',
      },
      {
        key: 'Mobile App - Car Remote Functions',
        value: '6',
        percentage: 0.2,
        doing: '6',
        remain: 0,
      },
      {
        key: 'RO/VCC/TIE CMQ',
        value: '2',
        percentage: 0.2,
        doing: '2',
        remain: 0,
      },
    ]
  },
  // 结构修改，确定后需通知后端
  operation: [
    // {
    //   key: 'APP Wechat',    // 项目名称
    //   resRate: '97',        // SLA平均事件响应
    //   rptAmount: '1',       // MIR(#)事故报告
    // },
    // {
    //   key: 'NB SAL',
    //   resRate: '96',
    //   rptAmount: '1',
    // },
    // {
    //   key: 'NB AFS',
    //   resRate: '97',
    //   rptAmount: '1',
    // },
    // {
    //   key: 'Bl',
    //   resRate: '97',
    //   rptAmount: '1',
    // },
    {
      name: 'APP Wechat',             // 项目名称
      details: [
        {
          key: 'SLA平均事件响应',       // 属性名称1
          value: '96.4',                // 属性值1
        },
        {
          key: 'MIR(#)事故报告',       // 属性名称2
          value: '0',                 // 属性值2
        },
      ]
    },
    {
      name: 'NB SAL',
      details: [
        {
          key: 'SLA平均事件响应',
          value: '99.74',
        },
        {
          key: 'MIR(#)事故报告',
          value: '0',
        },
      ]
    },
    {
      name: 'NB AFS',
      details: [
        {
          key: 'SLA平均事件响应',
          value: '99.74',
        },
        {
          key: 'MIR(#)事故报告',
          value: '0',
        },
      ]
    },
    {
      name: 'Bl',
      details: [
        {
          key: 'SLA平均事件响应',
          value: '100',
        },
        {
          key: 'MIR(#)事故报告',
          value: '0',
        },
      ]
    },
  ],

  deptSts: {
    totalAmount: '99999999',       // 项目总金额
    bidAmount: '99999999',       // 总中标金额
    poAmount: '99999999',        // 总po金额
    settleAmount: '99999999',     // 总结算金额
    planPoint: '99999999',        // 总预计点数
    realPoint: '99999999',        // 总实际点数
    deptDetails: [
      {
        name: '部门1',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '部门2',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          // {
          //   key: '办公费用',
          //   bidAmount: '99999999',   // 中标金额
          //   poAmount: '99999999',    // po金额
          //   settleAmount: '99999999', // 结算金额
          //   planPoint: '99999999',    // 预计点数
          //   realPoint: '99999999',    // 实际点数
          // },
          // {
          //   key: '其他',
          //   bidAmount: '99999999',   // 中标金额
          //   poAmount: '99999999',    // po金额
          //   settleAmount: '99999999', // 结算金额
          //   planPoint: '99999999',    // 预计点数
          //   realPoint: '99999999',    // 实际点数
          // },
        ]
      },
      {
        name: '部门3',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用2',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '部门4',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '部门5',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '部门6',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
    ]
  },
  supplierSts: {
    bidAmount: '99999999',       // 总中标金额
    poAmount: '99999999',        // 总po金额
    settleAmount: '99999999',     // 总结算金额
    planPoint: '99999999',        // 总预计点数
    realPoint: '99999999',        // 总实际点数
    deptDetails: [
      {
        name: '唯都',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '荣联',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '凯捷',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: 'NEC',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '联蔚',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '华为',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: '用友',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: 'PWC',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
      {
        name: 'KPMG',      // 部门名称
        percentage: 0.99,   // 中标金额占比
        bidAmount: '99999999',   // 部门中标金额
        poAmount: '99999999',    // 部门po金额
        settleAmount: '99999999', // 部门结算金额
        planPoint: '99999999',    // 部门预计点数
        realPoint: '99999999',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '99999999',   // 中标金额
            poAmount: '99999999',    // po金额
            settleAmount: '99999999', // 结算金额
            planPoint: '99999999',    // 预计点数
            realPoint: '99999999',    // 实际点数
          },
        ]
      },
    ]
  },
  trendData: {
    xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
    yAxisData: [820, 932, 901, 1290]
  },
  progressDefine: [
    {
      title: '需求完成进度',
      color: 'success',
      current: 404,
      target: 582,
    },
    {
      title: 'PO金额/中标金额',
      color: null,
      current: 9999999,
      target: 99999999,
    },
    {
      title: '实际工作点数/预计工作点数',
      color: 'exception',
      current: 9999999,
      target: 99999999,
    },
    {
      title: '风险统计',
      color: 'warning',
      current: 0,
      target: 1,
    }
  ]
}

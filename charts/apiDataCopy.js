
let apiData;

/**
 * 获取绘图数据
 * @param {*} modelName
 *    C端用户统计: userSts
 *    需求分布: reqDetail
 *    事件统计 - china: accidentChina
 *    事件统计 - global: accidentGlobal
 *    运维统计: operationSts
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
  userSts: [
    { key: 'App总用户数', value: 100000245, unit: '项' },
    { key: 'App在线用户人数', value: '5654', unit: '项' },
    { key: 'App新增用户注册率', value: '56.42%', unit: '件' },
    { key: 'App日活用户数', value: '32232', unit: '件' },
    { key: '绑车率', value: '76.51%', unit: '件' },

    { key: '小程序总用户数', value: '10321', unit: '条' },
    { key: '小程序日活用户数', value: '6420', unit: '条' },
    { key: '小程序用户新增率', value: '56.4%', unit: '条' },
  ],
  reqDetail: {
    total: 2654,     // 需求总数
    waiting: 782,    // 待排期
    doing: 872,      // 进行中
    finished: 1000,   // 已完成
  },
  accidentChina: {
    total: '100',          // 质量问题总数
    details: [
      {
        key: 'C端',        // 项目/分类名称
        value: '174',       // 问题数量
        percentage: 0.3,   // 所占比例
      },
      {
        key: 'B端',
        value: '30',
        percentage: 0.3,
      },
      {
        key: '中台',
        value: '40',
        percentage: 0.4,
      },
    ]
  },
  accidentGlobal: {
    total: '100',           // 质量问题总数
    details: [
      {
        key: 'RO/VCC/TIE NSC',        // 项目/分类名称
        value: '30',                  // 总数
        percentage: 0.4,              // 问题比例
        doing: '25',                  // 进行中数量
        remain: '5',                  // 剩余数量
      },
      {
        key: 'Mobile app APAC Focus',
        value: '30',
        percentage: 0.4,
        doing: '25',
        remain: '5',
      },
      {
        key: 'Mobile App - Car Remote Functions',
        value: '18',
        percentage: 0.2,
        doing: '12',
        remain: '6',
      },
      {
        key: 'RO/VCC/TIE CMQ',
        value: '18',
        percentage: 0.2,
        doing: '12',
        remain: '6',
      },
    ]
  },
  // 结构修改，确定后需通知后端
  operationSts: [
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
          value: '97',                // 属性值1
        },
        {
          key: 'MIR(#)事故报告',       // 属性名称2
          value: '1',                 // 属性值2
        },
      ]
    },
    {
      name: 'NB SAL',
      details: [
        {
          key: 'SLA平均事件响应',
          value: '96',
        },
        {
          key: 'MIR(#)事故报告',
          value: '1',
        },
      ]
    },
    {
      name: 'NB AFS',
      details: [
        {
          key: 'SLA平均事件响应',
          value: '97',
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
          value: '97',
        },
        {
          key: 'MIR(#)事故报告',
          value: '1',
        },
      ]
    },
  ],

  deptSts: {
    totalAmount: '15222220',       // 项目总金额
    bidAmount: '14222220',       // 总中标金额
    poAmount: '2722223',        // 总po金额
    settleAmount: '5722222',     // 总结算金额
    planPoint: '1211',        // 总预计点数
    realPoint: '829',        // 总实际点数
    deptDetails: [
      {
        name: 'Dealer Network',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '17222200',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '932222220',   // 中标金额
            poAmount: '1432',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '440',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'Dealer',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '7222200',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          // {
          //   key: '办公费用',
          //   bidAmount: '1420',   // 中标金额
          //   poAmount: '142',    // po金额
          //   settleAmount: '32', // 结算金额
          //   planPoint: '12',    // 预计点数
          //   realPoint: '22',    // 实际点数
          // },
          // {
          //   key: '其他',
          //   bidAmount: '1420',   // 中标金额
          //   poAmount: '142',    // po金额
          //   settleAmount: '32', // 结算金额
          //   planPoint: '12',    // 预计点数
          //   realPoint: '22',    // 实际点数
          // },
        ]
      },
      {
        name: 'Network2',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '722200',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '14220',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '440',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用2',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'Network3',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1222200',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '14220',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '440',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'Network4',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '4222200',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '14220',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '440',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'Dealer Network5-0',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '7222200',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '14220',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '440',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
    ]
  },
  supplierSts: {
    bidAmount: '1420',       // 总中标金额
    poAmount: '142',        // 总po金额
    settleAmount: '22',     // 总结算金额
    planPoint: '12',        // 总预计点数
    realPoint: '22',        // 总实际点数
    deptDetails: [
      {
        name: '唯都',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '2221420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: '荣联',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: '凯捷',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '22220',   // 中标金额
            poAmount: '1242',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'NEC',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: '联蔚',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: '华为',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: '用友',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'PWC',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
        ]
      },
      {
        name: 'KPMG',      // 部门名称
        percentage: 0.35,   // 中标金额占比
        bidAmount: '1420',   // 部门中标金额
        poAmount: '142',    // 部门po金额
        settleAmount: '22', // 部门结算金额
        planPoint: '12',    // 部门预计点数
        realPoint: '22',    // 部门实际点数
        details: [
          {
            key: '云平台',       // 项目名称
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '硬件采购',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '办公费用',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
          },
          {
            key: '其他',
            bidAmount: '1420',   // 中标金额
            poAmount: '142',    // po金额
            settleAmount: '32', // 结算金额
            planPoint: '12',    // 预计点数
            realPoint: '22',    // 实际点数
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
      current: 48,
      target: 80,
    },
    {
      title: 'PO金额/中标金额',
      color: null,
      current: 20220,
      target: 202220,
    },
    {
      title: '实际工作点数/预计工作点数',
      color: 'exception',
      current: 310,
      target: 400,
    },
    {
      title: '风险统计',
      color: 'warning',
      current: 5,
      target: 5,
    }
  ]
}
